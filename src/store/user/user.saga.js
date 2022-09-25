import { takeLatest, put, all, call } from 'redux-saga/effects'
import { USER_ACTION_TYPES } from './user.types'
import { emailSignInSuccess, emailSignInFailed } from './user.action'

//FIREBASE
import { getCurrentUser, createUserDocumentFromAuth } from '../../utils/firebase/firebase'


export function* getSnapshotFromUserAuth(userAuth, additionalDetails){
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        yield put(emailSignInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (error) {
        yield put(emailSignInFailed(error));
    }
}


export function* isUserAuthticated(){
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(emailSignInFailed(error));
    }
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthticated)
}


export function* userSaga(){
    yield all([ call(onCheckUserSession) ]);
}