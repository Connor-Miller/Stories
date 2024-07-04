import { Container, Text, Button, Group } from '@mantine/core';
import classes from './HiddenDetails.module.css';

const HiddenDetails: React.FC = () => {


    return (
        <div className={classes.wrapper}>
            <Container size={700} className={classes.inner}>
                <h1 className={classes.title}>
                    An{' '}
                    <Text component="span" variant="gradient" gradient={{ from: 'primary', to: 'secondary' }} inherit>
                        easy to use
                    </Text>{' '}
                    platform to record, categorize, and search family memories
                </h1>

                <Text className={classes.description} color="dimmed">
                    Record precious memories using our rich text editor or try text-to-speech.
                    Even upload videos, recordings, or photos to allow the memory to come back to life.
                </Text>

                <Group className={classes.controls}>
                    <Button
                        size="xl"
                        className={classes.control}
                        variant="gradient"
                        gradient={{ from: 'primary', to: 'secondary' }}
                    >
                        Get Connected
                    </Button>

                    
                </Group>
            </Container>
        </div>
    );
}

export default HiddenDetails;