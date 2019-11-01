import React from 'react';
import MuiAvatar from '@material-ui/core/Avatar';

// eslint-disable-next-line import/prefer-default-export
export class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
  }

  render() {
    let { handleChangeFile, file, image, ...rest } = this.props;

    return (
      <>
        <MuiAvatar
          style={{
            width: 80,
            height: 80,
            margin: 'auto',
            cursor: 'pointer',
          }}
          src={
            file
              ? URL.createObjectURL(file)
              : image
              ? image
              : 'https://tinyjpg.com/images/social/website.jpg'
          }
          onClick={() => this.fileUpload.current.click()}
          alt="Ảnh đại diện"
          component="div"
        />
        <input
          type="file"
          ref={this.fileUpload}
          style={{ display: 'none' }}
          onChange={handleChangeFile}
        />
      </>
    );
  }
}
