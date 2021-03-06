import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchCategories() {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/categorieslist');
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_CATEGORIES', payload: response.data });
    yield put({ type: 'FETCH_UNIQUE_CATEGORIES'});

    //AFTER we have al the categories, some drop downs unique categories,
    // so this these store unique categories in a reducer. 
    
    
  } catch (error) {
    console.log('categorieslist get request failed', error);
  }
}

function* fetchUniqueCategories() {
  try{
    const response = yield axios.get('/api/uniquecategories');
    yield put({ type: 'SET_UNIQUE_CATEGORIES', payload: response.data });

  }catch (error) {
    console.log('uniquecategories get request failed', error);
  }
}

function* categoriesListSaga() {
  yield takeLatest('FETCH_CATEGORIES', fetchCategories);
  yield takeLatest('FETCH_UNIQUE_CATEGORIES', fetchUniqueCategories);
}

export default categoriesListSaga;
