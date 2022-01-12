import React from 'react';
import styles from '../style.css';

type MyProps = {
  category : Object;
  choice : any;
}

class CategoryView extends React.Component<MyProps> {
  constructor (props) {
    super(props);
    this.state = {
      activeTeam: null
    };
  }

  render () {
    return (
            <div>
                <div className={styles['select-category']}>
                {Object.values(this.props.category).map(entryInCategory => (
                <div key={ entryInCategory.name }className={styles['select-team']} onClick={() => this.props.choice(entryInCategory)}>
                    {entryInCategory.name}
                </div>
                ))}
              </div>
            </div>

    );
  }
}

export default CategoryView;
