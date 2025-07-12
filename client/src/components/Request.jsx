import './Request.css';

const RequestModal = ({ user, onClose, onSubmit }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Request Skill Swap with {user.name}</h2>

        <form onSubmit={onSubmit}>
          {/* Offered Skill Dropdown */}
          <label>
            Choose one of your offered skills:
            <select name="offeredSkill" required>
              <option value="">Select your offered skill</option>
              <option value="Photoshop">Photoshop</option>
              <option value="React">React</option>
              <option value="Java">Java</option>
              <option value="Photography">Photography</option>
              <option value="Excel">Excel</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Linux">Linux</option>
              <option value="Digital Marketing">Digital Marketing</option>
              {/* Add more if needed */}
            </select>
          </label>

          {/* Wanted Skill Dropdown */}
          <label>
            Choose one of their wanted skills:
            <select name="wantedSkill" required>
              <option value="">Select their wanted skill</option>
              {user.skillsWanted.map((skill, i) => (
                <option key={i} value={skill}>{skill}</option>
              ))}
            </select>
          </label>

          {/* Message Box */}
          <label>
            Message:
            <textarea name="message" placeholder="Write your message..." rows="4" />
          </label>

          <div className="modal-buttons">
            <button type="submit" className="send-btn">Submit</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;
