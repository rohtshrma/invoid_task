import React, { useState } from 'react'
import { Container, Grid, Card, CardContent, CardActions, Button, Typography, Paper, } from '@material-ui/core';
import uploadImage from './uploadImage.png';
import { Alert } from '@material-ui/lab';
import { CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from './ChangingProgressProvider'; 
const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [cardState, setCardState] = useState('uploadImage');
    const [disableButton, setDisableButton] = useState(false);

    const classes = {
        uploadStyle: {
            height: 250,
            width: 400
        },
        heading: {
            marginTop: '20px',
            fontWeight: 'bold'
        },
        cardStyle: {
            display: 'block',
            width: '100%',
            padding:'20px'
        },
        button: {
            marginTop: '10px'
        },
        loader: {
            fontSize: '10px'
        }
    }

    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    const renderElement = () => {
        if (cardState === 'uploadImage') {
            return <img src={uploadImage} alt="upload" style={classes.uploadStyle} />
        }
        else if (cardState === 'showContent') {
            return <ShowContent fileData={selectedFile} />
        }
        else if (cardState === 'loader') {
            return (
                <>
                    {

                        <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100, 101]} >
                            {percentage => (
                                percentage === 101 ? setCardState('success') : <CircularProgressbar
                                    value={percentage} text={`${percentage}%`} />
                            )}
                        </ChangingProgressProvider>
                    }
                </>
            )
        }
        else if (cardState === 'success') {
            return <Success />
        }
        else if (cardState === 'Error') {
            return <ShowMessage type="error" message="Please Select a file first." />
        }
    }

    function ShowMessage({ type, message }) {
        return <Alert severity={"" + type}>{message}</Alert>
    }
    function Success() {
        return (
            <>
                <ShowMessage type="success" message="File Uploaded Successfully !" />
            </>
        )
    }

    const ShowContent = () => {
        return (
            <>
                <Paper elevation={3} variant="outlined">
                    <Typography variant="h3" align="center">Selected File</Typography>

                    <Typography variant="h6" align="center">File Name</Typography>
                    <Typography variant="body2" align="center">{selectedFile.name}</Typography>

                    <Typography variant="h6" align="center">File Size</Typography>
                    <Typography variant="body2" align="center">{bytesToSize(selectedFile.size)}</Typography>

                    <Typography variant="h6" align="center">File Type</Typography>
                    <Typography variant="body2" align="center">{selectedFile.type}</Typography>
                </Paper>
            </>
        )
    }

    const onFileUpload = () => {
        setDisableButton(true);
        if (!selectedFile)
            setCardState('Error');
        else
            setCardState('loader');
    }

    const onFileChange = (event) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);
        setCardState('showContent');
    }

    return (
        <>
            <Container>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={11} sm={8}>
                        <Card style={classes.cardStyle}>
                            <Typography align="center" variant="h4" style={classes.heading}>Upload Your Document</Typography>
                            <CardContent>
                                {
                                    renderElement()
                                }
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        fullWidth
                                        disabled={disableButton}
                                        size="large"
                                        style={classes.button}
                                    >
                                        Upload File
                                        <input
                                            type="file"
                                            hidden
                                            onChange={onFileChange}
                                        />
                                    </Button>
                                </CardActions>
                                <CardActions>
                                    <Button variant="contained" color="primary" size="large" style={classes.button} fullWidth onClick={onFileUpload}>
                                        Submit
                                    </Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default App;
