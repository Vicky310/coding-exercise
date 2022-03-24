import React, { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchLikedFormSubmissions } from './service/mockServer';
import { Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';


export default function Content() {
  const [submissionList, setSubmissionList] = useState();
  const [isListLoading, setIsListLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const fetchData = async () => {
    try {
      setIsListLoading(true);
      const result = await fetchLikedFormSubmissions();
      setSubmissionList(result.formSubmissions);
    } catch (e) {
      setIsListLoading(false);
      setErrorMessage(e.message);
    } finally {
      setIsListLoading(false);
    }
  }

  useEffect(() => {
    // Fetches data during the first load
    fetchData();
    window.addEventListener('storage', fetchData)
    // Garbage collecting to avoid unbinded events
    return () => window.removeEventListener("storage", fetchData);
  }, [])


  return (
    <Fragment>
      <div>

      </div>
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h4">Liked Form Submissions</Typography>
        {errorMessage ? <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Error fetching data - {errorMessage}
        </Alert> :
          <Typography component={'div'} variant="body1" sx={{ fontStyle: 'italic', marginTop: 1 }}>
            {isListLoading ? <CircularProgress />
              :
              <Fragment>
                {submissionList && submissionList.length ?
                  <div style={{ maxHeight: 500, overflow: 'auto' }}>
                    {
                      submissionList.map((item, index) => {
                        return (
                          <Accordion key={index}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <Typography>Name: {item.data.firstName} {item.data.lastName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                Email: {item.data.email}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        )
                      })
                    }
                  </div>
                  :
                  <p>No data to display. Make a new submission to see the list of data!</p>
                }
              </Fragment>
            }
          </Typography>
        }
      </Box>

    </Fragment >
  );
}
