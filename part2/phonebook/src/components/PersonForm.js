import React from "react";

const PersonForm = ({
  addPersonHandler,
  newNameField,
  newNameFieldHandler,
  newNumberField,
  newNumberFieldHandler
}) => (
  <form onSubmit={addPersonHandler}>
    <div>
      name: <input value={newNameField} onChange={newNameFieldHandler} />
    </div>
    <div>
      number: <input value={newNumberField} onChange={newNumberFieldHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
