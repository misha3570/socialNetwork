import React from 'react';
import {CreateField, Input, Textarea} from "../../common/formsControls/FormsControls";
import {reduxForm} from "redux-form";
import s from './ProfileInfo.module.css';
import style from '../../common/formsControls/FormsControls.module.css'

const ProfileDataForm = ({handleSubmit, profile, error}) => {
  return <form onSubmit={handleSubmit}>
    <div><button>Save</button></div>
    {error && <div className={style.formSummatyError}>{error}</div>}
    <div><b>Full name</b>:{CreateField('Full name', 'fullName', [], Input)}</div>
    <div>
      <div><b>Looking for a job</b>:{CreateField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}</div>
        <div><b>My professional skills</b>
          {CreateField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
        </div>
      <div><b>About me</b>:{CreateField('About Me', 'aboutMe', [], Textarea)}</div>
      <div><b>Contacts</b>:{Object.keys(profile.contacts).map(key => {
        return <div key={key} className={s.contact}>
          <b>{key}:{CreateField(key, 'contacts.' + key, [], Input)}</b>
        </div>

        // <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
      })}</div>
    </div>
  </form>
};

const ProfileDataFormReduxForm = reduxForm({form: 'editProfile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;