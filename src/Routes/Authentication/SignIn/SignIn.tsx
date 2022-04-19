import './sign-in.scss';

const SignIn = () => {
  return (
    <div className="sign-in">
      <div className="sign-in--heading">
        <h2>ავტორიზაცია</h2>
        <p>
          არ ხარ ჩვენი გუნდის წევრი? გაიარე
          <a href="" className="link sign-in--register">რეგისტრაცია</a>
        </p>
      </div>
      <form className="sign-in--form">
        <div className="form__group">
          <input className="input" type="email" id="email" />
          <label className="input--label" htmlFor="email"> ელ.ფოსტა </label>
        </div>
        <div className="form__group">
          <input className="input" type="password" id="password" />
          <label className="input--label" htmlFor="password"> პაროლი </label>
        </div>
      </form>
      <div className="sign-in--form-controls">
        <button className="button button--primary">ავტორიზაცია</button>
        <button className="button button--text">დაგავიწყდა პაროლი?</button>
      </div>
    </div>
  );
};

export default SignIn;
