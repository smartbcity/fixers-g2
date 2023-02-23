## An example of the component

<article>

_id_ `string`

Unique identifier for the object.

</article>
<article>

_amount_ `integer`

Disputed amount. Usually the amount of the charge, but can differ (usually because of currency fluctuation or because only part of the order is disputed).

</article>
<article>

_charge_ `string` [EXPANDABLE](https://example.com)

ID of the charge that was disputed.

</article>
<article>

_currency_ `currency`

Three-letter [ISO currency code](https://example.com), in lowercase. Must be a [supported currency](https://example.com).

</article>
<article>

_evidence_ `hash`

Evidence provided to respond to a dispute. Updating any field in the hash will submit all fields in the hash for review.

</article>
<article>

_metadata_ `hash`

Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.

</article>
<article>

_payment_intent_ `string`

ID of the PaymentIntent that was disputed.

</article>
<article>

_reason_ `string`

Reason given by cardholder for dispute. Possible values are `bank_cannot_process`, `check_returned`, `credit_not_processed`, `customer_initiated`, `debit_not_authorized`, `duplicate`, `fraudulent`, `general`, `incorrect_account_details`, `insufficient_funds`, `product_not_received`,`product_unacceptable`, `subscription_canceled`, or `unrecognized`. Read more about dispute reasons.

</article>
<article>

_status_ `string`

Current status of dispute. Possible values are `warning_needs_response`, `warning_under_review`, `warning_closed`, `needs_response`, `under_review`, `charge_refunded`, `won`, or `lost`.

</article>

> [Try it out !](https://example.com)
