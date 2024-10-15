import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import classNames from "classnames/bind";
import styles from './Home.module.scss';
function Home() {

    const cx = classNames.bind(styles); 
  return (
    <div>
      <h1> Home Page</h1>
      
        <div className={cx('container')}>
            <div className={cx('row')}>
                <h1>KAHOOT !</h1>
                <div>
                    <input placeholder="Nhập mã PIN"/>
                    <button>Enter</button>

                </div>
            </div>
        </div>
      
    </div>
  );
}

export default Home;
