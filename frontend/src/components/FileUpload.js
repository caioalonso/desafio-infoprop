import React, { Component } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";

registerPlugin(FilePondPluginFileValidateType);

// Our app
class FileUpload extends Component {
  render() {
    return (
      <div className="FileUpload">
        <FilePond
          ref={ref => (this.pond = ref)}
          name="csvFile"
          allowMultiple={false}
          allowRevert={false}
          maxFiles={1}
          labelIdle='Arraste um arquivo CSV ou <span class="filepond--label-action"> selecione um </span>'
          labelFileProcessing="Enviando"
          labelFileProcessingComplete="Upload completo"
          labelTapToCancel="Toque para cancelar"
          labelTapToRetry="Toque para tentar novamente"
          allowFileTypeValidation={true}
          acceptedFileTypes={["text/csv"]}
          labelFileTypeNotAllowed="Arquivo inválido"
          fileValidateTypeLabelExpectedTypes="Arquivo deve ser um CSV"
          server="http://localhost:3000/v1/properties/csvUpload"
          onprocessfile={(err, file) => {
              setTimeout(this.pond.removeFiles, 2000);
              this.props.updateMap();
          }}
        />
      </div>
    );
  }
}

export default FileUpload;
