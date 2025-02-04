import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddApplicationModal from "./AddApplicationModal";
import AddDocumentModal from "./AddDocumentModal";
const ApplicationForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [docModal, setDocModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [applications, setApplications] = useState([]);
  const [docName, setDocName] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState("pending");
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    const newApplication = { name: inputValue, documents: [] };
    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    setSelectedApplication(updatedApplications.length - 1);
    setShowModal(false);
    setInputValue("");
  };


  const handleDelete = (index) => {
    const updatedApplications = applications.filter((_, i) => i !== index);
    setApplications(updatedApplications);
    if (selectedApplication === index) {
      setSelectedApplication(null);
      setSelectedDocument(null);
    } else if (selectedApplication > index) {
     
      setSelectedApplication((prev) => prev - 1);
    }
  };
  

  const handleAddDocument = () => {
    if (selectedApplication === null) return;

    const newDocument = { name: docName, file: null };
    const updatedApplications = applications.map((app, index) => {
      if (index === selectedApplication) {
        return { ...app, documents: [...app.documents, newDocument] };
      }
      return app;
    });
    setApplications(updatedApplications);
    setSelectedDocument(applications[selectedApplication].documents.length); 
    setDocModal(false);
    setDocName("");
  };

  const handleButtonClick = (buttonType) => {
    if (buttonType === "choose" && fileInputRef.current) {
      setUploadStatus("pending");
      fileInputRef.current.click();
    }
    if (buttonType === "cancel") {
      setFile(null);
      setUploadStatus("");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
      }
    }
  };

  const handleUpload = () => {
    if (file && selectedApplication !== null && selectedDocument !== null) {
      const updatedApplications = applications.map((app, appIndex) => {
        if (appIndex === selectedApplication) {
          return {
            ...app,
            documents: app.documents.map((doc, docIndex) => {
              if (docIndex === selectedDocument) {
                return { ...doc, file: file };
              }
              return doc;
            }),
          };
        }
        return app;
      });
      setApplications(updatedApplications);
      setTimeout(() => {
        setUploadStatus("completed");
      }, 1000);
    }
  };

  const handleDocumentClick = (appIndex, docIndex) => {
    setSelectedApplication(appIndex);
    setSelectedDocument(docIndex);
  };

  
  const handleNextDocument = () => {
    if (selectedApplication === null || selectedDocument === null) return;
  
    const currentApp = applications[selectedApplication];
    const nextDocIndex = selectedDocument + 1;
    if (nextDocIndex < currentApp.documents.length) {
      setSelectedDocument(nextDocIndex);
    } else {
    
      const nextAppIndex = selectedApplication + 1;
      if (nextAppIndex < applications.length) {
        setSelectedApplication(nextAppIndex);
        setSelectedDocument(0);
      } else {
        if (applications.length === 0) return;
        setSelectedApplication(0);
        setSelectedDocument(0);
      }
    }
  };
  
  const handlePreviousDocument = () => {
    if (selectedApplication === null || selectedDocument === null) return;
  
    const currentApp = applications[selectedApplication];
    const prevDocIndex = selectedDocument - 1;
  
    
    if (prevDocIndex >= 0) {
      setSelectedDocument(prevDocIndex);
    } else {
      
      const prevAppIndex = selectedApplication - 1;
      if (prevAppIndex >= 0) {
        const prevApp = applications[prevAppIndex];
        setSelectedApplication(prevAppIndex);
        setSelectedDocument(prevApp.documents.length - 1);
      } else {
        
        if (applications.length === 0) return;
        const lastAppIndex = applications.length - 1;
        const lastApp = applications[lastAppIndex];
        setSelectedApplication(lastAppIndex);
        setSelectedDocument(lastApp.documents.length - 1);
      }
    }
  };
  

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      setUploadStatus("pending");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between my-5 mx-4">
        <h1 className="text-muted">
          <b>Document Upload</b>
        </h1>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-lg me-2"></i>Add Application
        </button>
      </div>
      {applications.length > 0 && (
        <div className="d-flex flex-row flex-wrap mx-3">
          {applications.map((app, appIndex) => (
            <div
              className="d-flex align-items-center me-3 mb-3 "
              key={appIndex}
              onClick={() => setSelectedApplication(appIndex)}
              style={{ cursor: "pointer" }}
            >
              <p
                className={`me-3 mb-0 ${
                  selectedApplication === appIndex
                    ? "text-primary "
                    : "text-dark"
                }`}
              >
                <b>{app.name}</b>
              </p>
              <button
                className="btn btn-primary btn-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(appIndex);
                }}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="card">
        {selectedApplication !== null &&
        applications[selectedApplication].documents.length === 0 ? (
          <div className="d-flex flex-column align-items-start mt-5 mx-5">
            <h6 className="text-muted me-3 mb-4">No documents available</h6>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setDocModal(true)}
            >
              <i className="bi bi-plus-lg me-4"></i>Add
            </button>
          </div>
        ) : selectedApplication !== null ? (
          <div className="d-flex flex-row flex-wrap mx-3">
            <div className="mt-4">
              {applications[selectedApplication].documents.map(
                (doc, docIndex) => (
                  <div
                    className={`d-flex align-items-center me-3 mb-3 p-2 rounded ${
                      selectedDocument === docIndex
                        ? "bg-primary text-light"
                        : "bg-light"
                    }`}
                    key={docIndex}
                    onClick={() =>
                      handleDocumentClick(selectedApplication, docIndex)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <p className="me-3 mb-0 ps-4">
                      <b>{doc.name}</b>
                    </p>
                  </div>
                )
              )}
              <div>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => setDocModal(true)}
                >
                  <i className="bi bi-plus-lg me-4"></i>Add
                </button>
              </div>
            </div>
            <div
              className="card mt-4 w-75"
              style={{ marginLeft: "50px", marginRight: "50px" }}
            >
              <div className="card-header">
                <button
                  className={`btn btn-primary btn-lg me-4`}
                  onClick={() => handleButtonClick("choose")}
                >
                  <i className="bi bi-plus-lg me-2"></i>
                  <b>Choose</b>
                </button>
                <button
                  className={`btn btn-primary btn-lg me-4 ${
                    file ? "active" : "disabled"
                  }`}
                  onClick={handleUpload}
                  disabled={!file}
                >
                  <i className="bi bi-upload me-2"></i>
                  <b>Upload</b>
                </button>
                <button
                  className={`btn btn-primary btn-lg me-4 ${
                    file ? "active" : "disabled"
                  }`}
                  onClick={() => handleButtonClick("cancel")}
                >
                  <i className="bi bi-x-lg me-2"></i>
                  <b>Cancel</b>
                </button>
              </div>
              <div
                className="card-body d-flex flex-column align-items-start"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !file && fileInputRef.current?.click()}
                style={{
                  border: dragActive ? "2px dashed #0d6efd" : "",
                  backgroundColor: dragActive ? "#e9ecef" : "",
                  cursor: !file ? "pointer" : "default",
                  minHeight: "200px",
                }}
              >
                <input
                  type="file"
                  className="d-none"
                  ref={fileInputRef}
                  onChange={handleFile}
                />
                {file ? (
                  <div>
                    <p className="my-5">
                      {file.name}{" "}
                      {uploadStatus === "pending" && (
                        <span className="badge rounded-pill bg-warning">
                          Pending
                        </span>
                      )}
                      {uploadStatus === "completed" && (
                        <span className="badge rounded-pill bg-success">
                          Completed
                        </span>
                      )}{" "}
                      <i
                        className="bi bi-x-lg btn btn-light rounded-circle text-danger position-absolute top-3 end-0 me-5"
                        onClick={() => {
                          setFile(null);
                          setUploadStatus("");
                        }}
                      ></i>
                    </p>
                  </div>
                ) : (
                  <p className="my-5">
                    {dragActive
                      ? "Drop files here"
                      : "Drag and Drop files here or click to select"}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}
        <div className="card-body d-flex justify-content-between my-5 mx-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={handlePreviousDocument}
          >
            <i className="bi bi-arrow-left me-2"></i>Back
          </button>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleNextDocument}
          >
            Next<i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
       <AddApplicationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      <AddDocumentModal
        show={docModal}
        onClose={() => setDocModal(false)}
        onAdd={handleAddDocument}
        docName={docName}
        setDocName={setDocName}
      />
      {(showModal || docModal) && (
        <div
          className="modal-backdrop fade show"
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </div>
  );
};

export default ApplicationForm;
