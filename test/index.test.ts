import mimetype from '../src';

describe('mimetype', () => {
  it('docx', () => {
    expect(mimetype.lookup('example.docx')).toEqual(
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
  });
  it('no found', () => {
    expect(mimetype.lookup('example.abcd')).toEqual(false);
  });
});
