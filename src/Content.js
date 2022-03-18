import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchLikedFormSubmissions } from './service/mockServer';
import { Button } from '@mui/material';


export default function Content() {
  const [submissionList, setSubmissionList] = useState();
  const [isListLoading, setIsListLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = () => {
    setIsError(false);
    const data = fetchLikedFormSubmissions();
    setIsListLoading(true);
    data.then(value => {
      setSubmissionList(value.formSubmissions);
      setIsListLoading(false);
    }).catch(err => {
      setIsListLoading(false);
      setIsError(true);
    });
  }

  useEffect(() => {
    // Fetches data during the first load
    fetchData();
    window.addEventListener('storage', () => {
      // Detects change in local storage whenever new data is saved
      fetchData();
    })
  }, [])


  return (
    <>
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h4">Liked Form Submissions</Typography>
        {isError ? <span>Error fetching form submissions, refresh the page or <Button onClick={fetchData}>Try again!</Button></span> :
          <Typography component={'div'} variant="body1" sx={{ fontStyle: 'italic', marginTop: 1 }}>
            {isListLoading ? <p> Fetching submission list... </p>
              :
              <>
                {submissionList && submissionList.length ?
                  <ul>
                    {submissionList.map((item, index) => {
                      return <li key={index}>Name: {item.data.firstName} {item.data.lastName} Email: {item.data.email} </li>
                    })}
                  </ul>
                  :
                  <p>No data to display. Make a new submission to see the list of data!</p>
                }
              </>
            }
          </Typography>
        }
      </Box>

    </>
  );
}
