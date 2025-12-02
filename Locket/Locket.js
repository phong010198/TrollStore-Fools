const mapping = {
    '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
    'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"],
    obj = JSON.parse($response.body);

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

var locket02 = {
    is_sandbox: false,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    expires_date: "2099-12-18T01:04:17Z",
    grace_period_expires_date: null,
    unsubscribe_detected_at: null,
    original_purchase_date: "2025-09-02T01:04:18Z",
    purchase_date: "2025-09-02T01:04:17Z",
    store: "app_store"
};

var locket01 = {
    grace_period_expires_date: null,
    purchase_date: "2025-09-02T01:04:17Z",
    product_identifier: "com.locket02.premium.yearly",
    expires_date: "2099-12-18T01:04:17Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
    let [e, s] = mapping[match]; // e is entitlement, s is product_identifier

    // If a custom product identifier (s) is defined in the mapping
    if (s) {
        locket01.product_identifier = s;
        obj.subscriber.subscriptions[s] = locket02;
    } else {
        // Use default product identifier if s is not defined
        obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02;
    }

    // Set the entitlement with the found key (e)
    obj.subscriber.entitlements[e] = locket01;

} else {
    // If no match in User-Agent, apply default subscription and "pro" entitlement
    obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02;
    obj.subscriber.entitlements.pro = locket01;
}

$done({
    body: JSON.stringify(obj)
});