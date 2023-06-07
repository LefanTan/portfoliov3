gcloud functions deploy warmer \
--region=us-central1 \
--runtime=nodejs16 \
--source=. \
--entry-point=directus-warmer \
--timeout 240 \
--trigger-http \
--allow-unauthenticated