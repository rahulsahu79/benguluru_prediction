import logging

# Create logger
logger = logging.getLogger(__name__)

# Set logging level
logger.setLevel(logging.INFO)

# Create file handler
file_handler = logging.FileHandler("app.log")

# Create formatter
formatter = logging.Formatter(
    "%(asctime)s - %(levelname)s - %(message)s"
)

# Set formatter
file_handler.setFormatter(formatter)

# Add handler to logger
logger.addHandler(file_handler)