import React, { useState, useEffect } from "react";
import { MannequinProduct, Inquiry, MannequinType, MaterialType, PoseType } from "../types";
import { FileText, ClipboardList, CheckCircle2, User, Mail, Building, Plus, Trash2 } from "lucide-react";

interface CustomInquiryProps {
  selectedProduct: MannequinProduct | null;
  configuredCustom: {
    type: MannequinType;
    material: MaterialType;
    pose: PoseType;
    estimatedPrice: number;
  } | null;
  onClearSelection: () => void;
}

export default function CustomInquiry({ selectedProduct, configuredCustom, onClearSelection }: CustomInquiryProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [lastSubmittedInquiry, setLastSubmittedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("dami_inquiries");
    if (saved) {
      setInquiries(JSON.parse(saved));
    }
  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newInquiry: Inquiry = {
      id: "DAMI-" + Math.floor(Math.random() * 90000 + 10000),
      name,
      email,
      companyName: company || "Independent Designer",
      quantity,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "confirmed",
    };

    if (selectedProduct) {
      newInquiry.mannequinId = selectedProduct.id;
    } else if (configuredCustom) {
      newInquiry.customSpecs = {
        type: configuredCustom.type,
        material: configuredCustom.material,
        pose: configuredCustom.pose,
        notes,
      };
    }

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem("dami_inquiries", JSON.stringify(updated));
    setLastSubmittedInquiry(newInquiry);

    setName("");
    setEmail("");
    setCompany("");
    setQuantity(1);
    setNotes("");
    onClearSelection();
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    localStorage.setItem("dami_inquiries", JSON.stringify(updated));
    if (lastSubmittedInquiry?.id === id) {
      setLastSubmittedInquiry(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      <div className="lg:col-span-7 bg-[#0c0c0e] border border-zinc-800 rounded-3xl p-8 md:p-10 space-y-8 shadow-xl">
        <div className="space-y-2">
          <h3 className="text-2xl font-light text-zinc-100 tracking-tight">
            Acquisitions Portal
          </h3>
          <p className="text-sm text-zinc-400">
            Submit a premium requisition request to connect with a Dami curation specialist.
          </p>
        </div>

        {selectedProduct || configuredCustom ? (
          <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-zinc-500 uppercase">Selected Model</p>
              <h4 className="text-sm font-medium text-zinc-200">
                {selectedProduct ? selectedProduct.name : `Custom configured ${configuredCustom?.type}`}
              </h4>
              <p className="text-xs text-zinc-400">
                {selectedProduct ? `${selectedProduct.material} • ${selectedProduct.pose}` : `${configuredCustom?.material} • ${configuredCustom?.pose}`}
              </p>
            </div>
            <button
              onClick={onClearSelection}
              className="text-[10px] font-mono text-amber-400 hover:text-amber-300 underline"
            >
              Change
            </button>
          </div>
        ) : (
          <div className="p-6 bg-zinc-950 border border-dashed border-zinc-800 rounded-xl text-center space-y-2">
            <p className="text-sm text-zinc-500">No active mannequin selection.</p>
            <p className="text-xs text-zinc-600 max-w-sm mx-auto">
              Select a mannequin from the Showroom catalog above or craft a bespoke model in our Laboratory.
            </p>
          </div>
        )}

        <form onSubmit={handleInquirySubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono tracking-wider text-zinc-400 uppercase flex items-center space-x-2">
                <User className="w-3.5 h-3.5 text-zinc-600" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alexander McQueen"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono tracking-wider text-zinc-400 uppercase flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-zinc-600" />
                <span>Business Email</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="studio@couture.com"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono tracking-wider text-zinc-400 uppercase flex items-center space-x-2">
                <Building className="w-3.5 h-3.5 text-zinc-600" />
                <span>Fashion House / Brand</span>
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g., Balenciaga Paris"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono tracking-wider text-zinc-400 uppercase flex items-center space-x-2">
                <Plus className="w-3.5 h-3.5 text-zinc-600" />
                <span>Quantity Requested</span>
              </label>
              <input
                type="number"
                min={1}
                required
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
              Special Fabrication Notes / Studio Requests
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Specify custom height alterations, unique non-slip bases, or paint formulations..."
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all duration-300 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-100 hover:bg-amber-400 text-zinc-950 font-medium py-4 rounded-xl transition-all duration-300 text-sm tracking-wide shadow-lg hover:shadow-amber-400/10 active:scale-[0.98]"
          >
            Submit Requisition Contract Proposal
          </button>
        </form>
      </div>

      <div className="lg:col-span-5 space-y-8">
        {lastSubmittedInquiry ? (
          <div className="bg-zinc-900 border border-amber-400/30 rounded-3xl p-8 relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/10 to-transparent pointer-events-none rounded-tr-3xl"></div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-amber-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-widest">Proposal Registered</span>
              </div>

              <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                  <div>
                    <p className="text-[9px] font-mono text-zinc-500">DRAFT INVOICE ID</p>
                    <p className="text-xs font-mono font-medium text-zinc-300">{lastSubmittedInquiry.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-mono text-zinc-500">DATE ISSUED</p>
                    <p className="text-xs font-mono text-zinc-300">{lastSubmittedInquiry.date}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[9px] font-mono text-zinc-500">ACQUIRER DETAILS</p>
                  <p className="text-xs text-zinc-200 font-medium">{lastSubmittedInquiry.name}</p>
                  <p className="text-[10px] text-zinc-400">{lastSubmittedInquiry.companyName}</p>
                  <p className="text-[10px] text-zinc-400">{lastSubmittedInquiry.email}</p>
                </div>

                <div className="border-t border-zinc-800 pt-4 space-y-2">
                  <p className="text-[9px] font-mono text-zinc-500">FABRICATION LINE ITEMS</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-300">
                      {lastSubmittedInquiry.mannequinId ? `Product Model: ${lastSubmittedInquiry.mannequinId}` : `Bespoke configuration (${lastSubmittedInquiry.customSpecs?.type})`}
                    </span>
                    <span className="text-zinc-400">Qty: {lastSubmittedInquiry.quantity}</span>
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-4 flex justify-between items-center">
                  <span className="text-xs font-mono text-zinc-500">REQUISITION STATUS</span>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">Pending Review</span>
                </div>
              </div>

              <p className="text-[10px] text-zinc-500 leading-relaxed text-center font-mono">
                A Dami curation partner will contact you within 2 business hours to verify shipping coordinates.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 h-full flex flex-col justify-between min-h-[350px]">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-zinc-400">
                <FileText className="w-5 h-5 text-zinc-600" />
                <h4 className="text-sm font-medium">Acquisition Ledger</h4>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                When you submit a requisition, Dami's system generates an instant commercial proposal and reserves your mannequin build queue automatically.
              </p>
            </div>

            <div className="border-t border-zinc-800 pt-6">
              <span className="text-xs font-mono text-zinc-500">DAMI DUMMIES LTD • GENEVA LONDON MILAN</span>
            </div>
          </div>
        )}

        {inquiries.length > 0 && (
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center space-x-2 text-zinc-400 border-b border-zinc-800 pb-3">
              <ClipboardList className="w-4 h-4 text-zinc-500" />
              <h4 className="text-xs font-mono uppercase tracking-wider">Active Workspace Orders ({inquiries.length})</h4>
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {inquiries.map((inq) => (
                <div key={inq.id} className="flex justify-between items-center p-3 bg-zinc-900/30 border border-zinc-800/60 rounded-xl text-xs">
                  <div>
                    <p className="font-mono text-zinc-300">{inq.id}</p>
                    <p className="text-[10px] text-zinc-500">{inq.companyName} • {inq.date}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">Pending</span>
                    <button
                      onClick={() => deleteInquiry(inq.id)}
                      className="text-zinc-600 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
