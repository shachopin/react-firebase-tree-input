export const Fields = ({state, handleChange}) => (
  <>
    <div className="col-xs-3">
      <input type="text" name="label" placeholder="Label" value={state.label} onChange={handleChange} className="form-control"></input>
    </div>
    <div className="col-xs-2">
      <input type="text" name="link" placeholder="Link" value={state.link} onChange={handleChange} className="form-control"></input>
    </div>
    <div className="col-xs-6">
      <textarea name="desc" placeholder="Description" value={state.desc} onChange={handleChange} rows={1} className="form-control"></textarea>
    </div>
  </>
);