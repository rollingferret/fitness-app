import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUserProfile, updateUserProfile } from '../../store/session';

const UserProfileForm = () => {

    // UPDATE

    // const { userId } = useParams();
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     if (userId) dispatch(fetchUser(userId));
    // }, [dispatch, userId])
    // const user = useSelector(getUser(userId));

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    // switch form type
    const formType = user ? "Update User Profile" : "Create User Profile";

    const [_id, setUserId] = useState( user ? user._id : "" );
    const [username, setUsername] = useState( user ? user.username : "" );
    const [email, setEmail] = useState( user ? user.email : "" );
    const [gender, setGender] = useState( user ? user.gender : "" );
    const [dob, setDob] = useState( user ? user.dob : "" );
    const [city, setCity] = useState( user ? user.city : "" );
    const [state, setState] = useState( user ? user.state : "" );
    const [weight, setWeight] = useState( user ? user.weight : "" );
    const [height, setHeight] = useState( user ? user.height : "" );

    const handleSubmit = (e) => {
        e.preventDefault();

        user ? dispatch(updateUserProfile({_id, username, email, gender, dob, city, state, weight, height}))
            : dispatch(createUserProfile({username, email, gender, dob, city, state, weight, height}));
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{formType}</h2>
            <label style={{ marginRight: '8px' }}>Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '150px' }}
            />
            <label style={{ marginLeft: '10px', marginRight: '8px' }}>Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '150px' }}
            />
            <input
                type="submit"
                value={formType}
                style={{
                    marginTop: '10px',
                    marginLeft: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            />
        </form>
    )

}

export default UserProfileForm;
