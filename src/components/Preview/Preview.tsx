import { BookReviewForm, Quote } from '@/types/BookReviewForm';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, Typography } from '@mui/material';
import { READING_STATUS_LABELS, FIELD_LABELS } from '@/constants/constants';
import { ReadingStatus } from '@/constants';
import { useState, useEffect } from 'react';

export function Preview() {
  const { watch } = useFormContext<BookReviewForm>();
  const formData = watch();
  const [deferredFormData, setDeferredFormData] = useState(formData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeferredFormData(formData);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData]);

  const getPreviewMessage = (key: keyof BookReviewForm): string => {
    const value = deferredFormData[key];

    if (value instanceof Date) {
      return `${FIELD_LABELS[key]}: ${value.toLocaleDateString()}`;
    }

    if (Array.isArray(value)) {
      if (key === 'quotes') {
        const quotesText = value
          .map((quote: Quote) => `${quote.text} ${quote.page ? `(${quote.page})` : ''}`)
          .join(',');
        return `${FIELD_LABELS[key]}: ${quotesText}`;
      }
      return `${FIELD_LABELS[key]}: ${value.join(', ')}`;
    }

    if (!value) {
      return `${FIELD_LABELS[key]}: -`;
    }

    if (key === 'status') {
      return `${FIELD_LABELS[key]}: ${READING_STATUS_LABELS[value as ReadingStatus]}`;
    }

    return `${FIELD_LABELS[key]}: ${value}`;
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6">Preview</Typography>
        <Typography variant="body1">{getPreviewMessage('title')}</Typography>
        <Typography variant="body1">{getPreviewMessage('author')}</Typography>
        <Typography variant="body1">{getPreviewMessage('totalPages')}</Typography>
        <Typography variant="body1">{getPreviewMessage('status')}</Typography>
        <Typography variant="body1">{getPreviewMessage('publishDate')}</Typography>
        <Typography variant="body1">{getPreviewMessage('startDate')}</Typography>
        <Typography variant="body1">{getPreviewMessage('endDate')}</Typography>
        <Typography variant="body1">{getPreviewMessage('rating')}</Typography>
        <Typography variant="body1">{getPreviewMessage('comment')}</Typography>
        <Typography variant="body1">{getPreviewMessage('quotes')}</Typography>
        <Typography variant="body1">{getPreviewMessage('recommend')}</Typography>
        <Typography variant="body1">{getPreviewMessage('visibility')}</Typography>
      </CardContent>
    </Card>
  );
}
