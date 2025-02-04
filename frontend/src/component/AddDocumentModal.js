import React from "react";

const AddDocumentModal = ({ show, onClose, onAdd, docName, setDocName }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Document</h5>
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
                    htmlFor="documentName"
                    className="fs-6 text-start w-100 mb-1 ms-1"
                  >
                    Document Name
                  </label>
                  <input
                    type="text"
                    name="documentName"
                    className="form-control"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={onAdd}
              >
                <i className="bi bi-check-lg me-2"></i>Add Document
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

export default AddDocumentModal;