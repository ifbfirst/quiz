import './SettingsPage.css';
import { ButtonComponent } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';
import { SelectComponent } from '../components/SelectComponent';
import { categoryOptions, difficultyOptions, timeOptions, typeOptions } from '../constants';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <div className="settings-wrapper">
      <section className="settings">
        <div className="settings-heading">
          <i className="fa-solid fa-gear"></i>
          <h4>settings</h4>
        </div>
        <InputComponent className={'input-number'} placeholder={'Enter number questions from 5 to 15'} />
        <SelectComponent className={'select-category'} options={categoryOptions} text={'category'} />
        <SelectComponent className={'select-difficulty'} options={difficultyOptions} text={'difficulty'} />
        <SelectComponent className={'select-time'} options={timeOptions} text={'time'} />
        <SelectComponent className={'select-type'} options={typeOptions} text={'type'} />
      </section>
      <section className="buttons-wrapper">
        <Link to={'/statistics'}>
          <ButtonComponent className={'stars-btn'} text={'See my stats'} />
        </Link>
        <Link to={'/quiz'}>
          <ButtonComponent className={'start-btn'} text={'Start quiz'} />
        </Link>
      </section>
    </div>
  );
};

export default SettingsPage;
