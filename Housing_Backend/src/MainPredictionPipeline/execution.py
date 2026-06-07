import sys

class CustomException(Exception):
    def __init__(self, error_message, error_details: sys):
        super().__init__(error_message)
        _, _, exc_tb = error_details.exc_info()
        self.file_name = exc_tb.tb_frame.f_code.co_filename
        self.line_no = exc_tb.tb_lineno

    def __str__(self):
        return f"Error occurred in python script name [{self.file_name}] line number [{self.line_no}] error message [{str(self.error_message)}]"