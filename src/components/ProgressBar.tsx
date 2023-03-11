import { Container } from '@mui/system';
import React from 'react';
import '../styles/progressBar.css';

interface ProgressBarProps {
    level: number,
    completed: number
}

function ProgressBar(props: ProgressBarProps) {
    const { level, completed } = props;

    const fillerStyles = {
        width: `${completed}%`,
    }
    return (
        <Container>
     <span className='level'>
                Level {level}
            </span>
            <div className='progress-bar-container'>
                        <div style={fillerStyles} className='progress-bar-filler'>
                            <span className='progress-bar-label'>
                                {`${Math.round((completed + Number.EPSILON) * 100) / 100}%`}
                            </span>
                        </div>
                    </div>
        </Container>


        
    );
}

export default ProgressBar;