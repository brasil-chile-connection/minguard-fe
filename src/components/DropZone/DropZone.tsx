import './DropZone.css';

import '@pqina/pintura/pintura.css';
import {
  openEditor,
  locale_en_gb,
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultImageOrienter,
  createDefaultShapePreprocessor,
  legacyDataToImageState,
  processImage,
  setPlugins,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_annotate,
  plugin_annotate_locale_en_gb,
  markup_editor_defaults,
  markup_editor_locale_en_gb,
} from '@pqina/pintura';

import { FilePond, registerPlugin, FilePondProps } from 'react-filepond';
import { FilePondFile } from 'filepond';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginImageEditor from '@pqina/filepond-plugin-image-editor';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageEdit,
  FilePondPluginImageEditor,
  FilePondPluginFilePoster,
);

setPlugins(plugin_crop, plugin_annotate);

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
  allowImageEdit,
  allowReorder,
  stylePanelLayout,
  acceptedFileTypes,
  imagePreviewHeight,
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
        allowImageEdit={allowImageEdit}
        allowReorder={allowReorder}
        filePosterMaxHeight={256}
        stylePanelLayout={stylePanelLayout}
        acceptedFileTypes={acceptedFileTypes}
        imageEditor={{
          legacyDataToImageState,
          createEditor: openEditor,

          imageReader: [createDefaultImageReader, {}],

          imageWriter: [createDefaultImageWriter, {}],

          imageProcessor: processImage,

          editorOptions: {
            utils: ['crop', 'annotate'],
            imageOrienter: createDefaultImageOrienter(),
            shapePreprocessor: createDefaultShapePreprocessor(),
            ...markup_editor_defaults,
            locale: {
              ...locale_en_gb,
              ...plugin_crop_locale_en_gb,
              ...plugin_annotate_locale_en_gb,
              ...markup_editor_locale_en_gb,
            },
          },
        }}
        imagePreviewHeight={imagePreviewHeight}
        onupdatefiles={onChange}
      />
    </div>
  );
}

export default DropZone;
