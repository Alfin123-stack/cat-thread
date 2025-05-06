import React from 'react';
import FormWrapper from '../../components/FormWrapper';
import InputField from '../../components/InputField';
import TextAreaField from '../../components/TextAreaField';
import Button from '../../components/Button';
import useInput from '../../hooks/useInput';
import useCreateThread from '../../hooks/useCreateThread';

function ThreadForm() {
  const [title, handleTitleChange] = useInput('');
  const [body, handleBodyChange] = useInput('');
  const [category, handleCategoryChange] = useInput('');

  const {
    submitThread, isLoading, error, threadsError,
  } = useCreateThread();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitThread({ title, body, category });
  };

  return (
    <div className="w-[70%] mx-auto p-6">
      <FormWrapper className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="title"
            label="Title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter thread title"
            required
          />

          <InputField
            id="category"
            label="Category"
            value={category}
            onChange={handleCategoryChange}
            placeholder="Enter thread category"
            required
          />

          <TextAreaField
            label="Text"
            value={body}
            onChange={handleBodyChange}
            placeholder="Enter the text of your thread"
            rows={6}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {threadsError && !isLoading && (
            <p className="text-red-500 text-sm">{threadsError}</p>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              loading={isLoading}
              loadingText="Creating..."
              fullWidth
            >
              Create Thread
            </Button>
          </div>
        </form>
      </FormWrapper>
    </div>
  );
}

export default ThreadForm;
