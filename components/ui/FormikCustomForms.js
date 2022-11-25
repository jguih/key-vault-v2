import formsStyles from "../../scss/modules/ui/FormikCustomForms.module.scss";
import { useField } from 'formik';

// Those components should only be used inside Formik's form
export function FloatingLabel({ label, ...props }) {
  // Formik's hook to handle custom input components
  // useField() will return [formik.getFieldProps(), formik.getFieldMeta()]
  const [field, meta] = useField(props);

  return (
    <div className="form-floating mb-3">
      <input
        className={`form-control ${formsStyles["form-control"]}`}
        {...field}
        {...props}
      />
      <label htmlFor={props.id || props.name}>{label}</label>
      {/* Check if input was touched by user and if there's an error */}
      {meta.touched && meta.error ? (
        <div className={`${formsStyles.error} mt-1`}>{meta.error}</div>
      ) : null}
    </div>
  );
}

export function FloatingLabelTextArea({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="form-floating mb-3">
      <textarea
        className={`form-control ${formsStyles["form-control"]}`}
        style={{ height: 150 + "px" }}
        {...field}
        {...props}
      />
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
}

export function FloatingLabelSelect({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="form-floating mb-3">
      <select
        className={`form-select ${formsStyles["form-select"]}`}
        {...field}
        {...props}
      />
      <label htmlFor={props.name || props.id}>{label}</label>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
}

export function Field({ label, startText, endText, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className='mb-3'>
      {label ?
        <label htmlFor={props.id || props.name} className="form-label">{label}</label> : null}
      <div className="input-group">
        {startText ?
          <span
            className={`input-group-text ${formsStyles["input-group-text"]}`}
          >{startText}</span> : ""}
        <input
          className={`form-control ${formsStyles["form-control"]}`}
          {...field}
          {...props}
        />
        {endText ?
          <span
            className={`input-group-text ${formsStyles["input-group-text"]}`}
          >{endText}</span> : ""}
      </div>
      {meta.touched && meta.error ? (
        <div className={`${formsStyles.error} mt-1`}>{meta.error}</div>
      ) : null}
    </div>
  );
}

export function CheckboxBtn({ label, invisibleLabel, ...props }) {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <div>
      {invisibleLabel === true ? (
        <>
          <label className="form-label opacity-0" >
            {label}
          </label><br />
        </>
      ) : null}
      <input
        className="btn-check"
        type="checkbox"
        {...field}
        {...props}
        autoComplete="off"
      />
      <label className="btn btn-outline-success" htmlFor={props.name || props.id}>
        {label}
      </label>
      {meta.touched && meta.error ? (
        <div className={`${formsStyles.error} mt-1`}>{meta.error}</div>
      ) : null}
    </div>
  );
}