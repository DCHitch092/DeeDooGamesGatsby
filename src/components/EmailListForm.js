import React, {useState} from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp'

const EmailListForm = () => {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    addToMailchimp(email) 
    .then(data => {
        if (data.result === "success") {
            setEmailStatus("success")
        }
      // I recommend setting data to React state
      // but you can do whatever you want (including ignoring this `then()` altogether)
      // console.log(data)
    })
    .catch(() => {
        setEmailStatus("failure")
      // unnecessary because Mailchimp only ever
      // returns a 200 status code
      // see below for how to handle errors
    })

  };

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit} >
      <h2>Subscribe</h2>
      <div >
        <input
          placeholder="Email address"
          name="email"
          type="text"
          onChange={handleEmailChange}
        />
        <button type="submit">Subscribe</button>
      </div>
      {emailStatus === 'success' && (
        <div id="subscribe-success">Email successfully added to our mailing list!</div>
        )}
        {emailStatus === 'failure' && (
            <div id="">Issue encountered, can you check your email is valid and try again</div>
            )}
    </form>
  );
};

export default EmailListForm;