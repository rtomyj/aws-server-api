# aws_server

## Purpose

Allow calls from web apps to AWS services. There are some AWS SDK services that cannot be used in browser (S3.listBuckets for example) as well CORS restriction (pre-flight) that can prevent objects from being accessed (if you cannot or don't want to modify CORS for example).

An example of CORS config for a bucket to use AWS SDK in browser

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <ExposeHeader>ETag</ExposeHeader>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

The only thing needed for this API to work is the Access Key ID and Secret Access Key. Everything else can be retrieved by other calling the correct methods.