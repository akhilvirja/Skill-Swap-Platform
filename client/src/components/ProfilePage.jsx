import { useState } from 'react';
import './ProfilePage.css';

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    skillsOffered: [],
    skillsWanted: [],
    availability: 'weekends',
    isPublic: true,
    photo: null,
  });

  const [skillOfferedInput, setSkillOfferedInput] = useState('');
  const [skillWantedInput, setSkillWantedInput] = useState('');

  const handleAddSkill = (type) => {
    if (type === 'offered' && skillOfferedInput) {
      setProfile({
        ...profile,
        skillsOffered: [...profile.skillsOffered, skillOfferedInput],
      });
      setSkillOfferedInput('');
    }
    if (type === 'wanted' && skillWantedInput) {
      setProfile({
        ...profile,
        skillsWanted: [...profile.skillsWanted, skillWantedInput],
      });
      setSkillWantedInput('');
    }
  };

  const handleRemoveSkill = (type, skill) => {
    setProfile({
      ...profile,
      [type]: profile[type].filter((s) => s !== skill),
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfile({ ...profile, photo: URL.createObjectURL(file) });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-actions">
          <button className="btn save">Save</button>
          <button className="btn discard">Discard</button>
        </div>
      </div>

      <div className="profile-body">
        <div className="profile-left">
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="input" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input type="text" className="input" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Skills Offered</label>
            <div className="skill-input-group">
              <input type="text" className="input" value={skillOfferedInput} onChange={(e) => setSkillOfferedInput(e.target.value)} />
              <button onClick={() => handleAddSkill('offered')} className="btn small">Add</button>
            </div>
            <div className="skill-tags">
              {profile.skillsOffered.map((skill) => (
                <span key={skill} className="tag">
                  {skill} <button onClick={() => handleRemoveSkill('skillsOffered', skill)} className="remove">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Availability</label>
            <input type="text" className="input" value={profile.availability} onChange={(e) => setProfile({ ...profile, availability: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Profile</label>
            <select className="input" value={profile.isPublic ? 'Public' : 'Private'} onChange={(e) => setProfile({ ...profile, isPublic: e.target.value === 'Public' })}>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
        </div>

        <div className="profile-right">
          <div className="form-group">
            <label>Skills Wanted</label>
            <div className="skill-input-group">
              <input type="text" className="input" value={skillWantedInput} onChange={(e) => setSkillWantedInput(e.target.value)} />
              <button onClick={() => handleAddSkill('wanted')} className="btn small">Add</button>
            </div>
            <div className="skill-tags">
              {profile.skillsWanted.map((skill) => (
                <span key={skill} className="tag">
                  {skill} <button onClick={() => handleRemoveSkill('skillsWanted', skill)} className="remove">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group photo-group">
            <label>Profile Photo</label>
            <div className="photo-container">
              {profile.photo && <img src={profile.photo} alt="profile" className="photo-preview" />}
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
              {profile.photo && <button className="remove" onClick={() => setProfile({ ...profile, photo: null })}>Remove</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}