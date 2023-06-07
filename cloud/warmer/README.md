### Create Cloud Scheduler

```
gcloud scheduler jobs create http directus-cron-warmer \
 --schedule="*/3 * * * *" \
 --uri="https://us-central1-portfolio-389104.cloudfunctions.net/warmer" \
 --http-method=GET
```
