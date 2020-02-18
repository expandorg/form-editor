import React, { useContext, useCallback, useRef } from 'react';

import {
  FormDataProvider,
  FileUploadServiceMock,
  ExecutionContextProvider,
} from '@expandorg/modules';

import Empty from './Empty';
import DropArea from './DropArea';
import { FormModule } from '../Module';
import { EditorContext } from '../EditorContext';
import { useTreeOps, Ops } from '../Tree';

import styles from './Form.module.styl';

const formData = {
  allowedRetries: 3,
  currentTry: 1,
};

const services = new Map([['fileUpload', new FileUploadServiceMock()]]);

export default function Form() {
  const { modules, controlsMap, selection, onAdd } = useContext(EditorContext);
  const ref = useRef(null);

  const scrollBottom = useCallback(op => {
    if (op === Ops.Add) {
      setTimeout(() => {
        const form = ref.current;
        form.scrollTop = form.scrollHeight - form.clientHeight;
      }, 100);
    }
  }, []);

  useTreeOps(scrollBottom);

  return (
    <div className={styles.container} ref={ref}>
      <DropArea className={styles.form} onAdd={onAdd}>
        {modules.length === 0 && <Empty />}
        <FormDataProvider formData={formData}>
          <ExecutionContextProvider
            form={{ modules }}
            controls={controlsMap}
            services={services}
            isSubmitting={false}
            onValidate={Function.prototype}
            onSubmit={Function.prototype}
            onNotify={Function.prototype}
          >
            {modules.map((module, order) => (
              <FormModule
                key={module.name}
                module={module}
                path={[order]}
                selection={selection.getId('edit')}
              />
            ))}
          </ExecutionContextProvider>
        </FormDataProvider>
      </DropArea>
    </div>
  );
}
