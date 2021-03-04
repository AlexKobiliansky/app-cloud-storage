import React from 'react';
import './filelist.scss';
import {useSelector} from 'react-redux';
import File from './File/File';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

function FileList(props) {
  const files = useSelector(state => state.files.files );

  if (files.length === 0) {
    return (
      <div className="loader">Папка пуста</div>
    )
  }

  return (
    <div className='filelist'>
      <div className="filelist__header">
        <div className="filelist__name">Название</div>
        <div className="filelist__date">Дата</div>
        <div className="filelist__size">Размер</div>
      </div>
      <TransitionGroup>
        {files.map(file =>
          <CSSTransition
            key={file._id}
            timeout={500}
            classNames={'file'}
            exit={false}
          >
            <File file={file}/>
          </CSSTransition>
          )}
      </TransitionGroup>


    </div>
  );
}

export default FileList;