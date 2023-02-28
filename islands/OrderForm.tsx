import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface OrderFormProps {
  order_id?: string;
}

export default function OrderForm(props: OrderFormProps) {
  const [oid, setOid] = useState(props.order_id);
  return (
    <div class="flex gap-2 w-full">
      <input
        type="text"
        class="flex-1 p-2 border-gray-200 border-2"
        value={oid}
        placeholder="XPD******"
        onInput={(e) => setOid((e.target as HTMLInputElement).value)}
      />
      <Button
        class="flex-none"
        disabled={!oid || oid.length === 0}
        onClick={() => {
          window.location.href = `/${oid}`;
        }}
      >
        Track
      </Button>
    </div>
  );
}
