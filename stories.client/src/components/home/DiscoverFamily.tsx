import { Button, Card, Text, Title } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import './DiscoverFamily.css';

const DiscoverFamily: React.FC = () => {


    return (
            <div className="family-background">
                <Card className="overlay-card" shadow="sm" padding="lg">
                    <Title className="card-title" order={1}>Capture your family's story</Title>
                    <Text className="card-subtitle" size="lg">Every family deserves to know their story.</Text>
                <Button
                    className="card-button"
                    variant="gradient"
                    gradient={{ from: 'primary', to: 'secondary' }}
                    onClick={() => window.location.href = '/signin' }
                >
                        Get Started
                        <IconChevronRight />
                    </Button>
                </Card>
            </div>
    );
}

export default DiscoverFamily;