import { takeLatest, put, all, call } from 'redux-saga/effects'
import { USER_ACTION_TYPES } from './user.types'
import { emailSignInSuccess, emailSignInFailed, signUpSuccess, signUpFailed, signOutFailed, signOutSuccess } from './user.action'

//FIREBASE
import { 
    getCurrentUser, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signIn,
    signUp,
    signOutUser,
 } from '../../utils/firebase/firebase'


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

export function* signInWithGoogle(){
    try {
        const {user} = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(emailSignInFailed(error));
    }
}

export function* signInWithEmail({payload: {email, password}}){
    try {
        const {user} = yield call(signIn, email, password)
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(emailSignInFailed(error));
    }
}

export function* signUpWithEmail({payload: {email, password, displayName}}){
    try {
        const {user} = yield call(signUp, email, password)
        yield put(signUpSuccess({user, additionalDetails: displayName}));

    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}){
    try {
        yield call(getSnapshotFromUserAuth, user, additionalDetails);
    } catch (error) {
        yield put(emailSignInFailed(error));
    }
}

export function* signOut(){
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail);
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthticated)
}


export function* userSaga(){
    yield all([ 
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}