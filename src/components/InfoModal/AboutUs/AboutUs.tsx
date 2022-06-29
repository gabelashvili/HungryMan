import clsx from 'clsx';
import { useState } from 'react';
import ArrowIcon from '../../../Icons/ArrowIcon';
import Button from '../../shared/Button';
import './about-us.scss';

const AboutUs = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="about-us">
      <div className={clsx('panel', show && 'is-active')}>
        <div className="panel--header with-border">
          <h3 className="panel--title">გაყიდული უჯრების რაოდენობა</h3>
          <Button type="icon" classes=" button--text button-pull-right is-rounded" handleClick={() => setShow(!show)}>
            <ArrowIcon />
          </Button>
        </div>
        <div className="panel--content">
          <p>
            Hungryman - ეს არის 3 განუყრელი მეგობრის გასართობი და იუმორისტული არხი.
            თორნიკე ჭყონია - თორნიკე - იდეების გენერატორი და ფულის უაზროდ მფლანგველი,
            მეგობრობს შავ იუმორთან, უყვარს ხინკალი, მწვადი და ოღრაშული დროსტარება.
            ნიკოლოზ ვასაძე - ვასა - ყოველთვის პოზიტიური, თვლის, რომ განსაკუთრებული
            გემოვნება აქვს, უყვარს ყველაფერი აზიური (მასაჟის გარდა), მეგობრებში
            ცნობილია როგორც სპონსორების რისხვა. გუგა ჭყონია - გუგა - ოპერატორი,
            მემონტაჟე, პაროდისტი, მუსიკოსი და ბითბოქსერი, ყველაფერი ერთად, თუმცა თავის
            დროზე კამერის მიღმა ყოფნა ამჯობინა, სხვანაირად ამ ვიდეოებს ვერ მივიღებდით.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
