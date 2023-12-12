import { useState } from 'react';
import Modal from '../../UI/Modal.js';
import API from '../../api/API.js';
import Panel from '../../UI/Panel.js';
import ObjectTable from '../../UI/ObjectTable.js';
import { ActionTray, ActionModify, ActionDelete } from '../../UI/Actions.js';
import ToolTipDecorator from '../../UI/ToolTipDecorator.js';
import ExerciseForm from '../entities/ExerciseForm.js';

export default function UserExercisePanels({ userExercises, reloadUserExercises }) {
  // Initialisation
  const putUserExercisesEndpoint = '/userExercises';
  const deleteUserExercisesEndpoint = '/userExercises';

  // State
  const [showFormId, setShowFormId] = useState(0);

  // Modal context
  const { handleModal } = Modal.useModal();

  // Methods
  const toggleModify = (id) => setShowFormId(showFormId === id ? 0 : id);

  const handleDelete = async (UserExerciseID, UserUserID) => { 
    const response = await API.delete(`${deleteUserExercisesEndpoint}/${UserExerciseID}/${UserUserID}`);
    if (response.isSuccess) {
      reloadUserExercises();
    } else {
      showErrorModal("Delete failed!", response.message);
    }
  };

  const handleSubmit = async (userExercise) => {
    const response = await API.put(`${putUserExercisesEndpoint}/${userExercise.UserExerciseID}/${userExercise.UserUserID}`, userExercise);
    if (response.isSuccess) {
      setShowFormId(0);
      reloadUserExercises();
    }
  };
  const handleCancel = () => setShowFormId(0);

  const showDeleteModal = (UserExerciseID, UserUserID) => handleModal({
    show: true,
    title: "Alert!",
    content: <p> Are you sure you want to delete this exercise?</p>,
    actions: [
      <ToolTipDecorator key="yes" message="Click to confirm deletion">
        <ActionModify showText onClick={() => handleDelete(UserExerciseID, UserUserID)} buttonText="Yes"/>
      </ToolTipDecorator>,
      <ToolTipDecorator key="no" message="Click to abandon deletion">
        <ActionDelete showText onClick={dismissModal} buttonText="No"/>
      </ToolTipDecorator>
    ]
  });

  const showErrorModal = (title, message) => handleModal({
    show: true,
    title: title,
    content: <p>{message}</p>,
    actions: [
      <ToolTipDecorator key="close" message="Click to dismiss error message">
        <ActionModify showText onClick={dismissModal} buttonText="Close" />
      </ToolTipDecorator>
    ]
  });

  const dismissModal = () => handleModal({ show: false });

  // View
  const displayableAttributes = [
    { key: 'ExerciseExerciseID', label: 'Exercise' },
    { key: 'Weight', label: 'Weight (kg)' },
    { key: 'Reps', label: 'Reps' },
    { key: 'Sets', label: 'Sets' },
    { key: 'Date', label: 'Date' }
  ];

  return (
    <Panel.Container>
      {userExercises.map((exercise) =>
        <Panel
          key={exercise.UserExerciseID}
          title={`Exercise: ${exercise.ExerciseExerciseID}`}
          level={3}
        >
          <Panel.Static level={4}>
            <ObjectTable object={exercise} attributes={displayableAttributes} />
          </Panel.Static>

          <ActionTray>
            <ToolTipDecorator message="Modify this exercise">
              <ActionModify showText onClick={() => toggleModify(exercise.UserExerciseID)} buttonText="Modify Exercise"/>
            </ToolTipDecorator>
            <ToolTipDecorator message="Delete this exercise">
              <ActionDelete showText onClick={() => showDeleteModal(exercise.UserExerciseID, exercise.UserUserID)} buttonText="Delete Exercise"/>
            </ToolTipDecorator>
          </ActionTray>

          {
            (showFormId === exercise.UserExerciseID ) &&
              <ExerciseForm initialExercise={exercise} onCancel={handleCancel} onSubmit={handleSubmit} />
          }
        </Panel>
      )}
    </Panel.Container>
  );
}
