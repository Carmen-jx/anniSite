import { useEffect, useRef, useState } from "react";

export default function PinPad({
  length = 4,
  correctPin = "0830",
  adminPin = "0602",
  onSuccess,
  onFail,
}) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const hiddenRef = useRef(null);

  useEffect(() => { hiddenRef.current?.focus(); }, []);

  const addDigit = (d) => {
    if (pin.length >= length) return;
    setError("");
    setPin((p) => p + d);
  };

  const del = () => setPin((p) => p.slice(0, -1));
  const clear = () => { setPin(""); setError(""); };

  const submit = () => {
    if (pin.length < length) { 
      setError(`Enter ${length} digits`); 
      return; 
    }
    
    if (pin === String(correctPin) || pin === String(adminPin)) {
      onSuccess && onSuccess(pin);
    } else {
      onFail && onFail();
      setError("Incorrect PIN");
    }
    
    setPin("");
    hiddenRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (/^[0-9]$/.test(e.key)) { e.preventDefault(); addDigit(e.key); }
    else if (e.key === "Backspace") { e.preventDefault(); del(); }
    else if (e.key === "Enter") { e.preventDefault(); submit(); }
  };

  const onPaste = (e) => {
    const t = (e.clipboardData.getData("text") || "").replace(/\D/g, "");
    if (!t) return;
    e.preventDefault();
    setPin(t.slice(0, length));
  };

  return (
    <div className="pinpad" aria-label="PIN keypad">
      <input
        ref={hiddenRef}
        className="pinpad__hidden"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9]*"
        aria-hidden="true"
        onKeyDown={onKeyDown}
        onPaste={onPaste}
      />

      <div className="pinpad__dots" onClick={() => hiddenRef.current?.focus()}>
        {Array.from({ length }).map((_, i) => (
          <span key={i} className={`pinpad__dot ${i < pin.length ? "is-filled" : ""}`} />
        ))}
      </div>

      {error && <div className="pinpad__error" role="alert">{error}</div>}

      <div className="pinpad__keys">
        {[1,2,3,4,5,6,7,8,9,"del",0,"ok"].map((k) =>
          k === "del" ? (
            <button key="del" type="button" className="key key--action" onClick={del} aria-label="Backspace">⌫</button>
          ) : k === "ok" ? (
            <button key="ok" type="button" className="key key--primary" onClick={submit} aria-label="Submit">OK</button>
          ) : (
            <button key={k} type="button" className="key" onClick={() => addDigit(String(k))}>{k}</button>
          )
        )}
      </div>

      <button type="button" className="pinpad__clear" onClick={clear}>Clear</button>
    </div>
  );
}
