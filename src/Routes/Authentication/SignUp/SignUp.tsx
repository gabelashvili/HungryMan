import './sign-up.scss';

const SignUp = () => {
  return (
    <div className="sign-up">
      <div className="sign-up--heading">
        <h2>რეგისტრაცია</h2>
        <p>
          უკვე ხარ რეგისტრირებული? გაიარე
          <a href="" className="link">ავტორიზაცია</a>
        </p>
      </div>
      <div className="register-tab">
        <div className="register-tab--item is-active"><span> ფიზიკური პირი </span></div>
        <div className="register-tab--item">
          <span>იურიდიული პირი</span>
        </div>
      </div>
      <form className="sign-up--form">
        <div className="form__group">
          <input className="input" type="text" id="name" />
          <label className="input--label" htmlFor="name"> სახელი</label>
        </div>
        <div className="form__group">
          <input className="input" type="surname" id="surname" />
          <label className="input--label" htmlFor="surname"> გვარი </label>
        </div>
        <div className="form__group">
          <input className="input" type="email" id="email" />
          <label className="input--label" htmlFor="email"> ელ.ფოსტა </label>
        </div>
        <div className="form__group">
          <input className="input" type="tel" id="tel" />
          <label className="input--label" htmlFor="tel"> მობილურის ნომერი </label>
        </div>
        <div className="form__group">
          <input className="input" type="password" id="password" />
          <label className="input--label" htmlFor="password"> პაროლი </label>
        </div>
        <div className="form__group">
          <input className="input" type="password" id="repeatPassword" />
          <label className="input--label" htmlFor="repeatPassword">
            გაიმეორე პაროლი
          </label>
        </div>
        <div className="form__group">
          <label className="input--checkbox" htmlFor="terms">
            <input type="checkbox" id="terms" />
            <span className="checkbox-box">
              <span className="checkbox-marker" />
            </span>
            <span className="checkbox-title">
              ვეთანხმები მოცემულ
              <a href="" className="link">წესებს და პირობებს</a>
            </span>
          </label>
        </div>
      </form>
      <div className="sign-up--form-controls">
        <button className="button button--primary">რეგისტრაცია</button>
      </div>
    </div>

  );
};

export default SignUp;
