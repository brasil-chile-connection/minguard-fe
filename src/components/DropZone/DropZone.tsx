import './DropZone.css';

import { FilePond, registerPlugin, FilePondProps } from 'react-filepond';
import { FilePondFile } from 'filepond';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);

interface DropZoneProps extends FilePondProps {
  allowBrowse?: boolean;
  allowDrop?: boolean;
  onChange?: (files: FilePondFile[]) => void;
}

function DropZone({
  name,
  files,
  labelIdle,
  required,
  allowDrop = true,
  allowBrowse = true,
  allowMultiple,
  allowImagePreview,
  allowReorder,
  stylePanelLayout,
  acceptedFileTypes,
  onChange = undefined,
}: DropZoneProps): JSX.Element {
  return (
    <div className="dropzone-container">
      <FilePond
        name={name}
        files={files}
        labelIdle={labelIdle}
        required={required}
        allowDrop={allowDrop}
        allowBrowse={allowBrowse}
        allowMultiple={allowMultiple}
        allowImagePreview={allowImagePreview}
        allowReorder={allowReorder}
        stylePanelLayout={stylePanelLayout}
        acceptedFileTypes={acceptedFileTypes}
        onupdatefiles={onChange}
      />
    </div>
  );
}

export default DropZone;
