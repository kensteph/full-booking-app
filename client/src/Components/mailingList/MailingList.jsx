import "./mailingList.css";

const MailingList = () => {
  return (
    <div className="mailingList">
        <h1 className="mailingTitle">Save time, save money!</h1>
        <span>Sign up and we'll send the best deals for you</span>
        <div className="mailingInput">
          <input
            type="text"
            className="mailingInputText"
            placeholder="Your email"
          />
          <button className="mailingButton">Subscribe</button>
        </div>
      </div>
  );
};

export default MailingList;
