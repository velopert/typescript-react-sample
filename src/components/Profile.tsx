import * as React from 'react';

interface Props {
  name: string;
  job: string;
}

const Profile: React.SFC<Props> = ({name, job}) => (
  <div>
    <h1>프로필</h1>
    <div>
      <b>이름: </b>
      {name}
    </div>
    <div>
      <b>직업: </b>
      {job}
    </div>
  </div>
);

export default Profile;