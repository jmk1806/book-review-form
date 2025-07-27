import { BookInfo } from '@/components/BookInfo';
import { STEP_LABELS, STEPS } from '@/constants/step';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Rating } from '@/components/Rating';
import { Quotes } from '@/components/Quotes';
import { Recommend } from '@mui/icons-material';
import { Visibility } from '@/components/Visibility';

export default function ReviewPage() {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <BookInfo />;
      case 1:
        return <Rating />;
      case 2:
        return <Quotes />;
      case 3:
        return <Recommend />;
      case 4:
        return <Visibility />;
      default:
        throw new Error('Invalid step');
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container sx={{ width: '100%', height: '100%', p: 4 }}>
        <Grid sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}
          >
            <Stepper activeStep={activeStep}>
              {STEPS.map((step) => (
                <Step key={step} sx={{ ':first-of-type': { pl: 0 }, ':last-of-type': { pr: 0 } }}>
                  <StepLabel>{STEP_LABELS[step]}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="h6">{STEP_LABELS[STEPS[activeStep]]}</Typography>
              {getStepContent(activeStep)}
            </CardContent>
          </Card>
        </Grid>
        <Fragment>
          <Box
            sx={[
              {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'end',
                flexGrow: 1,
                gap: 2,
                mt: 4,
              },
              activeStep !== 0
                ? { justifyContent: 'space-between' }
                : { justifyContent: 'flex-end' },
            ]}
          >
            {activeStep !== 0 && (
              <Button
                startIcon={<ChevronLeftRoundedIcon />}
                onClick={handleBack}
                variant="outlined"
                sx={{ display: 'flex' }}
              >
                이전
              </Button>
            )}
            {activeStep !== STEPS.length - 1 && (
              <Button
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                onClick={handleNext}
                sx={{ width: 'fit-content' }}
              >
                {activeStep === STEPS.length - 1 ? '완료' : '다음'}
              </Button>
            )}
          </Box>
        </Fragment>
      </Grid>
    </Container>
  );
}
