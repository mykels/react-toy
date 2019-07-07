const songs = [
    {title: 'No Scrubs', duration: '4:05'},
    {title: 'All Star', duration: '3:05'},
    {title: 'Macarena', duration: '4:20'},
    {title: 'I want it that way', duration: '7:01'}
];

export const fetchSongs = () => dispatch => {
    setTimeout(() => {
        dispatch({
            type: 'FETCH_SONGS',
            payload: songs
        });
    }, 2000);
};


export const selectSong = song => {
    return {
        type: 'SONG_SELECTED',
        payload: song
    }
};