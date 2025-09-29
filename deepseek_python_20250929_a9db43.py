# aws-lambda/lambda_function.py
def lambda_handler(event, context):
    return {'statusCode': 200, 'body': 'Hello AWS Lambda!'}