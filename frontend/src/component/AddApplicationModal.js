import React from "react";

const AddApplicationModal = ({ show, onClose, onSave, inputValue, setInputValue }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Application</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="applicationName"
                    className="fs-6 text-start w-100 mb-1 ms-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="applicationName"
                    className="form-control"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={onSave}
              >
                <i className="bi bi-check-lg me-2"></i>Save
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={onClose}
              >
                <i className="bi bi-x-lg me-2"></i>Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
    </>
  );
};

export default AddApplicationModal;