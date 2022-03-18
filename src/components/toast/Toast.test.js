import React from 'react';
import { screen, render } from '@testing-library/react';
import Toast from './Toast';

test('renders header text', () => {
    render(<Toast vertical={'top'} horizontal={'center'} open={true} handleSave={() => { }}
        handleClose={() => { }} isLoading={false}
        isError={false} />);

    const toastMessage = screen.getByText('User data not submitted');
    expect(toastMessage).toBeInTheDocument();
});