/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/shared/Button';

const Rules = ({ open, toggle }: {open:boolean, toggle: () => void}) => {
  return (
    <Modal handleClose={toggle} open={open} type="medium" modalTitle="წესები და პირობები">
      <div className="rules-conditions">
        <p>A Terms and Conditions is not required and it's not mandatory by law.</p>
        <p>
          Unlike Privacy Policies, which are required by laws such as the GDPR, CalOPPA and many others,
          there's no law or regulation on Terms and Conditions.
        </p>
        <p>
          However, having a Terms and Conditions gives you the right to
          the access of abusive users or to terminate the access to
          users who do not follow your rules and guidelines, as well as other desirable business benefits.
        </p>
        <p>It's extremely important to have this agreement if you operate a SaaS app.</p>
        <p>Here are a few examples of how this agreement can help you:</p>
        <p>
          If users abuse your website or mobile app in any way, you can
          terminate their account. Your "Termination" clause
          can inform users that their accounts would be terminated if they abuse your service.

        </p>
        <p>
          If users can post content on your website or mobile app (create content and share it on your platform),
          you can remove any
          content they created if it infringes copyright. Your Terms and Conditions
          will inform users that they can only create and/or share
          content they own rights to. Similarly, if users can register for an account and choose a username,
          you can inform users that they are not allowed to choose usernames that may infringe trademarks, i.e.
          usernames like Google, Facebook, and so on.
        </p>
        <p>
          If you sell products or services, you could cancel specific orders if a product price is incorrect.
          Your Terms and Conditions can include a clause to inform users that certain orders,
          at your sole discretion, can
          be canceled if the products ordered have incorrect prices due to various errors.
        </p>
        <p>And many more examples.</p>
        <p>
          In summary, while you do not legally need a Terms and Conditions agreement, there are many many
          reasons for you to have one. Not only will it make your business look more
          professional and trustworthy, but you'll also
        </p>
        <Button>ვეთანხმები</Button>
      </div>
    </Modal>
  );
};

export default Rules;
